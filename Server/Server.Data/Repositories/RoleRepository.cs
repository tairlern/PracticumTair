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
    public class RoleRepository: IRoleRepository
    {
        private readonly DataContext _context;

        public RoleRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Role>> GetAllAsync()
        {
            return await _context.Roles.ToListAsync();
        }
        public async Task<Role> GetByIdAsync(int id)
        {
            return await _context.Roles.FirstAsync(e => e.Id == id);
        }
        public async Task<Role> AddAsync(Role rolse)
        {
            _context.Roles.Add(rolse);
            await _context.SaveChangesAsync();
            return rolse;
        }
        public async Task<Role> UpdateAsync(int id, Role role)

        {
            var existrolse = await GetByIdAsync(id);
            role.Id = existrolse.Id;
            _context.Entry(existrolse).CurrentValues.SetValues(role);
            await _context.SaveChangesAsync();
            return existrolse;

        }
        public async Task DeleteAsync(int id)
        {
            var delrolse = await GetByIdAsync(id);
            _context.Roles.Remove(delrolse);
            await _context.SaveChangesAsync();

        }
    }
}
