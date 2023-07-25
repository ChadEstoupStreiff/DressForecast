import logging
import time

import mysql.connector
from dotenv import dotenv_values

from typing import List, Any

class DB:
    __instance = None

    @staticmethod
    def __new__(cls, *args, **kwargs):
        if DB.__instance is None:
            DB.__instance = super(DB, cls).__new__(
                cls, *args, **kwargs
            )

            config = dotenv_values("/.env")
            DB.__instance.conn = None
            for _ in range(10):
                try:
                    conn = mysql.connector.connect(host="dressforecast_database", user="root",
                                                   passwd=config["SQL_ROOTPASSWORD"],
                                                   database=config["SQL_DATABASE"])
                    DB.__instance.conn = conn
                    break
                except:
                    time.sleep(1)

            if DB.__instance.conn is None:
                logging.critical("Can't connect to DB")
                exit(1)
        return DB.__instance

    def _get_cursor(self):
        return self.conn.cursor(prepared=True)

    def commit(self, query: str, values: tuple = None) -> bool:
        try:
            if values is None:
                values = ()
            cursor = self._get_cursor()
            cursor.execute(query, values)

            if cursor is not None:
                cursor.close()
            self.conn.commit()
        except:
            return False
        return True

    def execute(self, query: str, values: tuple = None) -> List[List[Any]]:
        if values is None:
            values = ()
        cursor = self._get_cursor()
        cursor.execute(query, values)

        data = [[val for val in values] for values in cursor]
        if cursor is not None:
            cursor.close()
        return data

    def execute_single(self, query: str, values: tuple = None) -> List[Any]:
        data = self.execute(query, values)
        if len(data) > 0:
            return data[0]
        return None
