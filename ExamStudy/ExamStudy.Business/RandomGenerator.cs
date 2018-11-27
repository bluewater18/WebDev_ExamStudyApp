using System;
using System.Collections.Generic;
using System.Text;

namespace ExamStudy.Business
{
    class RandomGenerator
    {
        private int RandomNumber(int min, int max)
        {
            Random random = new Random();
            return random.Next(min, max);
        }

        private string RandomString(int size, bool lowerCase)
        {
            StringBuilder builder = new StringBuilder();
            Random random = new Random();
            char ch;
            for (int i = 0; i < size; i++)
            {
                ch = Convert.ToChar(Convert.ToInt32(Math.Floor(26 * random.NextDouble() + 65)));
                builder.Append(ch);
            }
            if (lowerCase)
                return builder.ToString().ToLower();
            return builder.ToString();
        }

        public string RandomToken()
        {
            StringBuilder builder = new StringBuilder();
            builder.Append(RandomString(10, false));
            builder.Append(RandomNumber(1000, 9999));
            builder.Append(RandomString(20, false));
            builder.Append(RandomNumber(100000, 999999));
            builder.Append("==");
            return builder.ToString();
        }
    }
}
