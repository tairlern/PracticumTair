namespace Server.APi.Models
{
    public class RoleEmployeePostModel
    {
        public int RoleId { get; set; }
       public int EmployeeId { get; set; }
        public bool IsManagement { get; set; }
        public DateTime StartDate { get; set; }
        //public bool Status { get; set; }
    }
}
