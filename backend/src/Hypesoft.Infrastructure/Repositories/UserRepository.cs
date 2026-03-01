using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;
using Hypesoft.Infrastructure.Data;
using MongoDB.Driver;

namespace Hypesoft.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly MongoContext _context;

    public UserRepository(MongoContext context)
    {
        _context = context;
    }

    public async Task CreateAsync(User user)
    {
        await _context.Users.InsertOneAsync(user);
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _context.Users
            .Find(u => u.Email == email)
            .FirstOrDefaultAsync();
    }

    public async Task<List<User>> GetAllAsync()
    {
        return await _context.Users
            .Find(_ => true)
            .ToListAsync();
    }
}