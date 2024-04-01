using AutoMapper;
using Server.Core.Models;
using Server.Core.Repositories;
using Server.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Service
{
    public class RoleService:IRoleService
    {
        private readonly IMapper _mapper;
        private readonly IRoleRepository _roleRepository;

        public RoleService(IRoleRepository roleRepository, IMapper mapper)
        {
            _roleRepository = roleRepository;
            _mapper = mapper;
        }
        public async Task<IEnumerable<Role>> GetAllAsync()
        {
            return await _roleRepository.GetAllAsync(); 
        }
        public async Task<Role> GetByIdAsync(int id)
        {
            return await _roleRepository.GetByIdAsync(id);
        }
        public async Task<Role> AddAsync(Role role)
        {
            if (role != null && !string.IsNullOrEmpty(role.Name ))
            {
                await _roleRepository.AddAsync(role);
                return role;
            }

            return null;
        }
        public async Task<Role> UpdateAsync(int id, Role role)
        {
            if (role != null && !string.IsNullOrEmpty(role.Name) )
            {
                return await _roleRepository.UpdateAsync(id, role);
            }
            return null;
        }
        public async Task DeleteAsync(int id)
        {
            await _roleRepository.DeleteAsync(id);
        }
    }
}
