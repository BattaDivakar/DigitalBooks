using Author.Services;
using Common;
using Common.Models;
using MassTransit;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Author
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMassTransit(
                 x =>
                 {
                     x.AddBus(provider => Bus.Factory.CreateUsingRabbitMq(config =>
                     {
                         config.Host(new Uri("rabbitmq://localhost/"), h =>
                         {
                             h.Username("guest");
                             h.Password("guest");
                         });
                         config.ReceiveEndpoint("NotificationBlockedBookQueue", ep =>
                         {

                         });
                     }));
                 });
            services.AddMassTransitHostedService();
            services.AddControllers();
            services.AddScoped<IAuthorService, AuthorServiceImpl>();
            services.AddDbContext<DigitalbookDBContext>(x => x.UseSqlServer(Configuration.GetConnectionString("AuthorDbConnection")));
            services.AddConsulConfig(Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseConsul(Configuration);
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
