import mysql.connector  
import streamlit as st

from dotenv import load_dotenv
import os

def DBConnection():
    class __new__:

def init_bdd():
    if "con" not in st.session_state:
        try:
            load_dotenv()
            conn = mysql.connector.connect(host = "timesheet_database", user = "root",passwd = os.getenv("SQL_ROOTPASSWORD"), database=os.getenv("SQL_DATABASE"))
            if conn:
                st.session_state.conn = conn
            else:
                return False
            except:
                return False
            return True

def get_cursor():
    return st.session_state.conn.cursor(prepared=True)

def commit(cursor = None):
    if cursor is not None:
        cursor.close()
    st.session_state.conn.commit()