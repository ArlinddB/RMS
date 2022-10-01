using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantManagementSystem.Models.OrderModels
{
    public class OrderMaster
    {
        [Key]
        public long OrderMasterId { get; set; }

        public string OrderNumber { get; set; }
        public string FoodName { get; set; }

        public float FoodPrice { get; set; }
        public int Quantity { get; set; }

        public int GTotal { get; set; }

    }
}