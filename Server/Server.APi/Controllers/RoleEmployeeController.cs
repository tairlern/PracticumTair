using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.APi.Models;
using Server.Core.DTOs;
using Server.Core.Models;
using Server.Core.Services;
using Server.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.APi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleEmployeeController : ControllerBase
    {
        private readonly IRoleEmployeeService _roleEmployeeService;
        private readonly IMapper _mapper;

        public RoleEmployeeController(IRoleEmployeeService roleEmployeeService, IMapper mapper)
        {
            _roleEmployeeService = roleEmployeeService;
            _mapper = mapper;

        }
        // GET: api/<RoleEmployeeController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            // Console.WriteLine("UsersController.Get Start :: " + HttpContext.Items["guid"]);
            var list = await _roleEmployeeService.GetAllAsync();
            // Console.WriteLine("UsersController.Get end :: " + HttpContext.Items["guid"]);
            return Ok(list);
        }

        // GET api/<RoleEmployeeController>/5
        [HttpGet("{ide}/{idr}")]
        public async Task<ActionResult> Get(int ide,int idr)
        {
            var roleEmployee = await _roleEmployeeService.GetByIdAsync(ide,idr);
            //var userDto = _mapping.MapToUserDto(user);
            var roleemployeeDto = _mapper.Map<RoleEmployee>(roleEmployee);
            return Ok(roleemployeeDto);
        }

        // POST api/<RoleEmployeeController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] RoleEmployeePostModel value)
        {
            var roleEmployee = _mapper.Map<RoleEmployee>(value);
            roleEmployee.Status = true;
            var addEmployeeTask = await _roleEmployeeService.AddAsync(roleEmployee);

            return Ok(addEmployeeTask);

        }

        // PUT api/<RoleEmployeeController>/5
        [HttpPut("{ide}/{idr}")]
        public async Task<ActionResult> Put(int ide, int idr, [FromBody] RoleEmployeePostModel value)
        {
            var roleemployeeDto = _mapper.Map<RoleEmployee>(value);
            roleemployeeDto.Status = true;
            var updateRoleEmployeeTask = await _roleEmployeeService.UpdateAsync(ide, idr, roleemployeeDto);
            return Ok(updateRoleEmployeeTask);
        }

        // DELETE api/<RoleEmployeeController>/5
        [HttpDelete("{ide}/{idr}")]
        public async Task<ActionResult> Delete(int ide,int idr)
        {
            var roleemployee = await _roleEmployeeService.GetByIdAsync(ide,idr);
            if (roleemployee is null)
            {
                return NotFound();
            }
            await _roleEmployeeService.DeleteAsync(ide,idr);
            return NoContent();
        }
    }
}
