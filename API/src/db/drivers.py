import logging
import time

import mysql.connector
from dotenv import dotenv_values


class DB:
    __instance = None

    @staticmethod
    def __new__(cls, *args, **kwargs):
        if DB.__instance is None:
            DB.__instance = super(DB, cls).__new__(
                cls, *args, **kwargs
            )

            config = dotenv_values("/app/.env")
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

    def commit(self, query: str, values: list = None):
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

    def execute(self, query: str, values: list = None):
        try:
            if values is None:
                values = ()
            cursor = self._get_cursor()
            cursor.execute(query, values)

            data = [[val for val in values] for values in cursor]
            if cursor is not None:
                cursor.close()
            return data
        except:
            return None
