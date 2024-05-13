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
    public class RoleEmployeeService: IRoleEmployeeService
    {
        private readonly IMapper _mapper;
        private readonly IRoleEmployeeRepository _roleEmployeeRepository;

        public RoleEmployeeService(IRoleEmployeeRepository roleEmployeeRepository, IMapper mapper)
        {
            _roleEmployeeRepository = roleEmployeeRepository;
            _mapper = mapper;
        }
        public async Task<IEnumerable<RoleEmployee>> GetAllAsync()
        {
            var list = await _roleEmployeeRepository.GetAllAsync();
            var filteredList = list.Where(e => e.Status == true).ToList();
            return filteredList;
        }
        public async Task<RoleEmployee> GetByIdAsync(int ide,int idr)
        {
            var roleemployee = await _roleEmployeeRepository.GetByIdAsync(ide,idr);

            if (roleemployee != null && roleemployee.Status)
            {
                return roleemployee;
            }

            return null;
        }
        public async Task<RoleEmployee> AddAsync(RoleEmployee roleEmployee)
        {
            
            if (roleEmployee != null && roleEmployee.StartDate >= DateTime.Today)
            {
                await _roleEmployeeRepository.AddAsync(roleEmployee);
                return roleEmployee;
            }

            return null;
        }
        public async Task<RoleEmployee> UpdateAsync(int ide,int idr, RoleEmployee roleEmployee)
        {
            if (roleEmployee != null )
            {
                return await _roleEmployeeRepository.UpdateAsync(ide,idr, roleEmployee);
            }
            return null;
        }
        public async Task DeleteAsync(int ide,int idr)
        {
            await _roleEmployeeRepository.DeleteAsync(ide,idr);
        }
    }
}
