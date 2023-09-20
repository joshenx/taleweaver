from pathlib import Path
import sys
path = str(Path(Path(__file__).parent.absolute()).parent.absolute())
sys.path.insert(0, path)

from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from common.database import Base
import pandas as pd

class DatabaseTest():

    SQLALCHEMY_DATABASE_URL = 'postgresql://postgres@localhost:5432'

    def __init__(self) -> None:
        self.engine = create_engine(DatabaseTest.SQLALCHEMY_DATABASE_URL)
        self.TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)

    def override_get_db(self):
            try:
                db = self.TestingSessionLocal()
                yield db
            finally:
                db.close()

    def add_to_test_database(self, df : pd.DataFrame, table_name : str):
        df.to_sql(table_name, con=self.engine, if_exists='replace')
