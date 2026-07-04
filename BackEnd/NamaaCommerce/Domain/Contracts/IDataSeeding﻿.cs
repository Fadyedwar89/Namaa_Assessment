

namespace Domain.Contracts
{
    public interface IDataSeeding﻿
    {
        Task SeedDataAsync(); // Implement this method to seed your data into the database 

        Task SeedIdentityDataAsync(); // Implement this method to seed identity-related data (e.g., users, roles) into the database
    }
}
