using AutoMapper;
using Server.APi.Models;
using Server.Core.Models;

namespace Server.APi
{
    public class PostModulMappingProfile:Profile
    {
        public PostModulMappingProfile()
        {
        CreateMap<EmployeePostModel, Employee>();
        CreateMap<RolePostModel, Role>().ReverseMap();
        CreateMap<RoleEmployeePostModel, RoleEmployee>().ReverseMap();
        }
       
    }
}
