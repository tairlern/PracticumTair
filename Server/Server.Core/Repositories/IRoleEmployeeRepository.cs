using Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Repositories
{
    public interface IRoleEmployeeRepository
    {
        Task<IEnumerable<RoleEmployee>> GetAllAsync();
    
        Task<RoleEmployee> GetByIdAsync(int ide, int idr);
        Task<RoleEmployee> AddAsync(RoleEmployee roleEmployee);
        Task<RoleEmployee> UpdateAsync(int ide, int idr, RoleEmployee roleEmployee);
        Task DeleteAsync(int ide, int idr);
    }



}
