namespace Hypesoft.Domain.Entities;

public class Product
{
    public Guid Id { get; private set; }
    public string Name { get; private set; }
    public string Description { get; private set; }
    public decimal Price { get; private set; }

    public Guid CategoryId { get; private set; }

    public int StockQuantity { get; private set; }

    public Product(string name, string description, decimal price, Guid categoryId)
    {
        Id = Guid.NewGuid();
        Name = name;
        Description = description;
        Price = price;
        CategoryId = categoryId;
        StockQuantity = 0;
    }

   
    public void UpdateDetails(string name, string description, decimal price)
    {
        Name = name;
        Description = description;
        Price = price;
    }

    public void Update(string name, string description, decimal price)
    {
        Name = name;
        Description = description;
        Price = price;
    }

    public void IncreaseStock(int quantity)
    {
        if (quantity <= 0)
            throw new ArgumentException("Quantidade inválida");

        StockQuantity += quantity;
    }

    public void DecreaseStock(int quantity)
    {
        if (quantity <= 0)
            throw new ArgumentException("Quantidade inválida");

        if (StockQuantity < quantity)
            throw new InvalidOperationException("Estoque insuficiente");

        StockQuantity -= quantity;
    }
}