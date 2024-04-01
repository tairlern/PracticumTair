using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Server.Core.Models;
using Server.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;

        public EmployeeRepository(DataContext context)
        {
            _context = context;

        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _context.Employees.Where(e => e.Status == true).ToListAsync();
        }
        public async Task<Employee> GetByIdAsync(int id)
        {
            return await _context.Employees.FirstAsync(e => e.Id == id);
        }
        public async Task<Employee> AddAsync(Employee employee)
        {
            await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();
            return employee;
        }
        public async Task<Employee> UpdateAsync(int id, Employee employee)
        {
            var existEmployee = await GetByIdAsync(id);
            employee.Id = existEmployee.Id; 
            _context.Entry(existEmployee).CurrentValues.SetValues(employee);
            await _context.SaveChangesAsync();
            return existEmployee;

        }
        public async Task DeleteAsync(int id)
        {
            var delEmployee = await GetByIdAsync(id);
            delEmployee.Status = false;
            await _context.SaveChangesAsync();

        }

    }
}
