using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Models
{
    public class RoleEmployee
    {
        public int RoleId { get; set; }
        public int EmployeeId { get; set; }
        public bool IsManagement { get; set; }
        public DateTime StartDate { get; set; }
        public bool Status { get; set; }
    }
}
