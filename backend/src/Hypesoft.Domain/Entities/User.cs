using System.Diagnostics.CodeAnalysis; 
namespace Hypesoft.Domain.Entities;

public class User
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }

    public User() { }

    [SetsRequiredMembers] // <--- Adicione este atributo aqui
    public User(string name, string email, string password)
    {
        Id = Guid.NewGuid();
        Name = name;
        Email = email;
        Password = password;
    }
}