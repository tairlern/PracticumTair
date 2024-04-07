using Microsoft.EntityFrameworkCore;
using Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Employee> Employees { get; set; }

        public DbSet<Role> Roles { get; set; }
        public DbSet<RoleEmployee> RoleEmployees { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=data2_db");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RoleEmployee>().HasKey(e => new { e.RoleId, e.EmployeeId });

        }
       
    }
}
