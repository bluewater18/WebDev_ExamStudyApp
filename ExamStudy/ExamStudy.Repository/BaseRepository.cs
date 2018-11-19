using System;
using System.Data;
using System.Data.SqlClient;
using MySql.Data.MySqlClient;

namespace ExamStudy.Repository
{
    public class BaseRepository : IDisposable {
        protected IDbConnection conn;
        public BaseRepository()
    {
        string connectionString = "Server=mysql3.csse.canterbury.ac.nz;Uid=mme88;Pwd=78631141;Database=mme88;";
        conn = new MySqlConnection(connectionString);
    }
        public void Dispose()
    {

    }

    }
}
