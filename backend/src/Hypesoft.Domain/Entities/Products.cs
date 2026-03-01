namespace Hypesoft.Domain.Entities;

public class Product
{
    public Guid Id { get; private set; }
    public string UserId { get; private set; }
    public string Name { get; private set; }
    public string Description { get; private set; }
    public decimal Price { get; private set; }
    public string Category { get; private set; }
    public int StockQuantity { get; private set; }

    public Product(string name, string description, decimal price, string category, int stockQuantity, string userId)
    {
        Id = Guid.NewGuid();
        Name = name;
        Description = description;
        Price = price;
        Category = category;
        StockQuantity = stockQuantity;
        UserId = userId;
    }

    public void Update(string name, string description, decimal price, string category, int stockQuantity)
    {
        Name = name;
        Description = description;
        Price = price;
        Category = category;
        StockQuantity = stockQuantity;
    }
}