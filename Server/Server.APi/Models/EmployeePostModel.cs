﻿namespace Server.APi.Models
{
    public class EmployeePostModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Tz { get; set; }
        public DateTime StartWork { get; set; }
        public DateTime DateBirth { get; set; }
        public bool Kind { get; set; }
        public bool Status { get; set; }

    }
}
