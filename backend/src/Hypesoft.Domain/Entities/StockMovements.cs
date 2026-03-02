namespace Hypesoft.Domain.Entities;

public class StockMovement
{
    public Guid Id { get; private set; }
   
    public Guid ProductId { get; private set; } 
    public int Quantity { get; private set; }
    public string Type { get; private set; }
    public DateTime Date { get; private set; }

    public StockMovement(Guid productId, int quantity, string type)
    {
        Id = Guid.NewGuid();
        ProductId = productId; 
        Quantity = quantity;
        Type = type;
        Date = DateTime.UtcNow;
    }
}