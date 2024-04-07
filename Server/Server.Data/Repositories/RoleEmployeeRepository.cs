using Microsoft.EntityFrameworkCore;
using Server.Core.Models;
using Server.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Data.Repositories
{
    public class RoleEmployeeRepository: IRoleEmployeeRepository
    {
        private readonly DataContext _context;

        public RoleEmployeeRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<RoleEmployee>> GetAllAsync()
        {
            return await _context.RoleEmployees.Where(e => e.Status == true).ToListAsync();
        }
        public async Task<RoleEmployee> GetByIdAsync(int ide,int idr)
        {
            return await _context.RoleEmployees.FirstAsync(e => e.EmployeeId == ide&&e.RoleId==idr);
        }
        public async Task<RoleEmployee> AddAsync(RoleEmployee remployee)
        {
            _context.RoleEmployees.Add(remployee);
            await _context.SaveChangesAsync();
            return remployee;
        }
       
        public async Task<RoleEmployee> UpdateAsync(int ide,int idr, RoleEmployee roleemployee)
        {
            var existrEmployee = await GetByIdAsync(ide,idr);
            //existrEmployee.RoleId = roleemployee.RoleId ;
            //existrEmployee.IsManagement= roleemployee.IsManagement;
            //existrEmployee.StartDate = roleemployee.StartDate;
            _context.Remove(existrEmployee);
            _context.Add(roleemployee);
           //_context.Entry(existrEmployee).CurrentValues.SetValues(roleemployee);
            await _context.SaveChangesAsync();
            return existrEmployee;
        }
        public async Task DeleteAsync(int ide,int idr)
        {
            var delEmployee = await GetByIdAsync(ide,idr);
            delEmployee.Status = false;
            await _context.SaveChangesAsync();

        }
    }
}
