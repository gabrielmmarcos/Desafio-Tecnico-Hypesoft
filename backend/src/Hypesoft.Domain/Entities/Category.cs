using MongoDB.Bson.Serialization.Attributes;

[BsonIgnoreExtraElements]
public class Category
{
    public Guid Id { get; private set; }
    public string Name { get; private set; } = null!;

    private Category() { } 

    public Category(string name)
    {
        Id = Guid.NewGuid();
        Name = name;
    }

    public void Update(string name)
    {
        Name = name;
    }
}