using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.APi.Models;
using Server.Core.DTOs;
using Server.Core.Models;
using Server.Core.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.APi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
     private readonly IMapper _mapper;

        public EmployeeController(IEmployeeService employeeService,IMapper mapper)
        {
            _employeeService = employeeService;
            _mapper = mapper;
 
        }
        // GET: api/<EmployeeController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
           // Console.WriteLine("UsersController.Get Start :: " + HttpContext.Items["guid"]);
            var list = await _employeeService.GetAllAsync();
           // Console.WriteLine("UsersController.Get end :: " + HttpContext.Items["guid"]);
            return Ok(list);
        }

        // GET api/<EmployeeController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var employee = await _employeeService.GetByIdAsync(id);
            //var userDto = _mapping.MapToUserDto(user);
            var employeeDto = _mapper.Map<EmployeeDto>(employee);
            return Ok(employeeDto);
        }

        // POST api/<EmployeeController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] EmployeePostModel value)
        {
            var employeeDto = _mapper.Map<Employee>(value);
            employeeDto.Status = true;
          
            var addEmployeeTask =await _employeeService.AddAsync(employeeDto);
           
            return Ok(addEmployeeTask);

        }

        // PUT api/<EmployeeController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] EmployeePostModel value)
        {
            var employeeDto = _mapper.Map<Employee>(value);
            employeeDto.Status = true;
            var updateEmployeeTask = await _employeeService.UpdateAsync(id,employeeDto);
            return Ok(updateEmployeeTask);
        }

        // DELETE api/<EmployeeController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var employee = await _employeeService.GetByIdAsync(id);
            if (employee is null)
            {
                return NotFound();
            }
            await _employeeService.DeleteAsync(id);
            return NoContent();
        }
        
    }
}
