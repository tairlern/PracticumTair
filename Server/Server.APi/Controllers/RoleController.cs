using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
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
    public class RoleController : ControllerBase
    {

        private readonly IRoleService _roleService;
        private readonly IMapper _mapper;

        public RoleController(IRoleService roleService, IMapper mapper)
        {
            _roleService = roleService;
            _mapper = mapper;

        }
        // GET: api/<RoleController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            // Console.WriteLine("UsersController.Get Start :: " + HttpContext.Items["guid"]);
            var list = await _roleService.GetAllAsync();
            // Console.WriteLine("UsersController.Get end :: " + HttpContext.Items["guid"]);
            return Ok(list);
        }

        // GET api/<RoleController>/5
        [HttpGet("{id}")]
        public async Task< ActionResult> Get(int id)
        {
            var role = await _roleService.GetByIdAsync(id);
            //var userDto = _mapping.MapToUserDto(user);
            var roleDto = _mapper.Map<RoleDto>(role);
            return Ok(roleDto);
        }

        // POST api/<RoleController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] RolePostModel value)
        {
            var roleDto = _mapper.Map<Role>(value);

            var addRoleTask = await _roleService.AddAsync(roleDto);

            return Ok(addRoleTask);

        }

        // PUT api/<RoleController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] RolePostModel value)
        {
            var role = _mapper.Map<Role>(value);
            var updateRoleTask =await _roleService.UpdateAsync(id, role);
            return Ok(updateRoleTask);
        }

        // DELETE api/<RoleController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var role = await _roleService.GetByIdAsync(id);
            if (role is null)
            {
                return NotFound();
            }
            await _roleService.DeleteAsync(id);
            return NoContent();
        }
    }
}
