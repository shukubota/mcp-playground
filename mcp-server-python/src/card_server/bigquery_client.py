from dataclasses import dataclass
from typing import List
import os
from pathlib import Path
from langchain_google_vertexai import ChatVertexAI
from google.cloud import bigquery

@dataclass
class CardInfo:
    card_id: int
    card_info: str
    similarity: float

class BigqueryClient:
    def __init__(self, project_id: str, dataset_id: str, location: str = "us-central1"):
        """
        GeminiRAGInquirer初期化
        Args:
            project_id: GCPプロジェクトID
            dataset_id: BigQueryデータセットID
            location: VertexAI APIのロケーション
        """
        self.project_id = project_id
        self.dataset_id = dataset_id
        self.client = bigquery.Client(project=project_id)
        self.embedding_model = "embedding_model"

    def escape_string_for_sql(self, s: str) -> str:
        """SQLクエリ用に文字列をエスケープする"""
        # 文字列内の改行を空白に置換
        s = s.replace('\n', ' ')
        # バックスラッシュをエスケープ
        s = s.replace('\\', '\\\\')
        # シングルクォートをエスケープ
        s = s.replace("'", "\\'")
        # ダブルクォートをエスケープ
        s = s.replace('"', '\\"')
        return s

    def get_similar_cards(self, question: str, embedding_table: str, top_k: int = 10) -> List[CardInfo]:
        escaped_question = self.escape_string_for_sql(question)
        
        job_config = bigquery.QueryJobConfig(
            query_parameters=[
                bigquery.ScalarQueryParameter("question", "STRING", escaped_question),
            ]
        )
        
        query = f"""
        WITH 
        -- 質問文をベクトル化
        question_embedding AS (
            SELECT *
            FROM ML.GENERATE_TEXT_EMBEDDING(
                MODEL `{self.project_id}.{self.dataset_id}.{self.embedding_model}`,
                (SELECT @question AS content),
                STRUCT(TRUE AS flatten_json_output)
            )
        ),
        -- カード情報との類似度計算
        similarity AS (
            SELECT 
                card_id,
                card_info,
                ML.DISTANCE(q.text_embedding, c.embedding, 'COSINE') as vector_distance
            FROM question_embedding q
            CROSS JOIN `{self.project_id}.{self.dataset_id}.{embedding_table}` c
        )
        SELECT 
            card_id,
            card_info,
            ROUND(1 - vector_distance, 4) as similarity_score
        FROM similarity
        WHERE vector_distance < 1
        ORDER BY vector_distance
        LIMIT {top_k}
        """
        
        similar_cards = [
            CardInfo(
                card_id=row.card_id,
                card_info=row.card_info,
                similarity=row.similarity_score
            )
            for row in self.client.query(query, job_config=job_config)
        ]
        
        return similar_cards
