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
using Microsoft.OpenApi.Models;
using Reader.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Reader
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
                    x.AddConsumer<Reader.Notifications.NotificationBlockedBook>();
                    x.AddBus(provider => Bus.Factory.CreateUsingRabbitMq(config =>
                    {
                        config.Host(new Uri("rabbitmq://localhost/"), h =>
                        {
                            h.Username("guest");
                            h.Password("guest");
                        });
                        config.ReceiveEndpoint("NotificationBlockedBookQueue", ep => {
                            ep.ConfigureConsumer<Reader.Notifications.NotificationBlockedBook>(provider);
                        });
                    }));
                });
            services.AddMassTransitHostedService();
            services.AddControllers();
            services.AddScoped<IReaderService, ReaderServiceImpl>();
            services.AddDbContext<DigitalbookDBContext>(x => x.UseSqlServer(Configuration.GetConnectionString("ReaderDbConnection")));
            services.AddConsulConfig(Configuration);
            services.AddSwaggerGen(x =>
            {
                x.SwaggerDoc("v2", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "ReaderAPP", Version = "v2" });
                x.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme()
                {
                    Name = "Authorization",
                    Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey,
                    Scheme = "bearer",
                    BearerFormat = "JWT",
                    In = Microsoft.OpenApi.Models.ParameterLocation.Header,
                    Description = "please enter token"
                });
                x.AddSecurityRequirement(new OpenApiSecurityRequirement {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference=new OpenApiReference
                            {
                                Type=ReferenceType.SecurityScheme,
                                Id="Bearer"
                            }
                        },
                        new string[]{ }
                    }
                });
            });
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

            app.UseSwagger();

            app.UseSwaggerUI(x => {
                x.SwaggerEndpoint("/swagger/v2/swagger.json", "Author app v2");
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
