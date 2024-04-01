using Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.DTOs
{
    public class EmployeeDto
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
