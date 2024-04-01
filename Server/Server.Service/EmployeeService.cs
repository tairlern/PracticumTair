using AutoMapper;
using Server.Core.DTOs;
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
    public class EmployeeService: IEmployeeService
    {
        private readonly IMapper _mapper;
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeService(IEmployeeRepository employeeRepository, IMapper mapper)
        {
            _employeeRepository = employeeRepository;
            _mapper = mapper;
        }
        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            var list = await _employeeRepository.GetAllAsync();
            var filteredList = list.Where(e => e.Status == true).ToList();
            return filteredList;
        }
        public  async Task<Employee> GetByIdAsync(int id) {
            var employee = await _employeeRepository.GetByIdAsync(id);

            if (employee != null && employee.Status)
            {
                return employee;
            }

            return null;
        }
        public async Task<Employee> AddAsync(Employee employee)
        {
            if (employee != null && !string.IsNullOrEmpty(employee.Tz) && employee.Tz.Length == 9)
            {
                await  _employeeRepository.AddAsync(employee);
                return employee;
            }

            return null;
        }
        public async  Task<Employee> UpdateAsync(int id, Employee employee) {
            if (employee != null && employee.Tz.Length == 9)
            {
                return await _employeeRepository.UpdateAsync(id,employee);
            }
            return null;
        }
       public async Task DeleteAsync(int id) {
             await _employeeRepository.DeleteAsync(id);
        }
    }
}
