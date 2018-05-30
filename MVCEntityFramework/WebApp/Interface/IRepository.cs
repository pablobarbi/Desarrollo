using System.Collections.Generic;


namespace WebApp.Interface
{
    interface IRepository<T>
    {
        IEnumerable<T> GetAll();
        T Get(int id);
        T Add(T item);
        bool Update(T item);
        bool Delete(int id);
    }
}

