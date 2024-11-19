
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

    public class AccountController(DataContext context, ITokenService tokenService) : BaseApiController
    {
        [HttpPost("register")] //account/register
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username)) {
                return BadRequest("User es taken!");
            }
            using var hmac = new HMACSHA256();
            
            var user = new AppUser 
            {
                UserName = registerDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            context.Users.Add(user);
            await context.SaveChangesAsync();

            return new UserDto
            {
                Username = user.UserName,
                Token = tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await context.Users.FirstOrDefaultAsync(x =>
            x.UserName == loginDto.Username.ToLower());

            if (user == null) return Unauthorized("Invalid username");

            using var hmac = new HMACSHA256(user.PasswordSalt);

            var ComputeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < ComputeHash.Length; i++){
                if(ComputeHash[i] == user.PasswordHash[i]) return Unauthorized("Invalid password");
            }

            return new UserDto 
            {
                Username = user.UserName,
                Token = tokenService.CreateToken(user)
            };
        }
        
        private async Task<bool> UserExists(string username)
        {
            return await context.Users.AnyAsync(u => u.UserName.ToLower()
             == username.ToLower());
        }
    }