namespace Hypesoft.Application.DTOs;

public record ProductRequest(string Name, string Description, decimal Price, Guid CategoryId, int StockQuantity);
public record ProductResponse(Guid Id, string Name, string Description, decimal Price, Guid CategoryId, int StockQuantity);