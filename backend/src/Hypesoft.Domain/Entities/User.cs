namespace Hypesoft.Domain.Entities;

public class User
{
    public Guid Id { get; set; }

    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }

    // Construtor vazio pro Mongo
    public User() { }

    public User(string name, string email, string password)
    {
        Id = Guid.NewGuid();
        Name = name;
        Email = email;
        Password = password;
    }
}