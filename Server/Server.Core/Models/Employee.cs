using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Tz { get; set; }
        public DateTime StartWork { get; set; }
        public DateTime DateBirth { get; set; }
        public string Kind { get; set; }
        public List<Role> MyProperty { get; set; }
        public bool Status { get; set; }
    }
}
