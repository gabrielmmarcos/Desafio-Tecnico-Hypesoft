using Hypesoft.Domain.Entities;

namespace Hypesoft.Domain.Repositories;

public interface IUserRepository
{
    Task CreateAsync(User user);
    Task<User?> GetByEmailAsync(string email);
    Task<List<User>> GetAllAsync();
}