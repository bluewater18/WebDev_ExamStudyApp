using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExamStudy.Business;
using ExamStudy.Repository;
using ExamStudy.Business.Interfaces;
using ExamStudy.Repository.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;

namespace ExamStudy.API
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
            services.AddCors();

            services.AddAuthentication("BasicAuthentication")
                .AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>("BasicAuthentication", null);

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddTransient<IAuthManager, AuthManager>();
            services.AddTransient<IUserManager, UserManager>();
            services.AddTransient<IGroupManager, GroupManager>();
            services.AddTransient<IResourceManager, ResourceManager>();
            services.AddTransient<IQuestionManager, QuestionManager>();
            services.AddTransient<IAnswerManager, AnswerManager>();

            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IGroupRepository, GroupRepository>();
            services.AddTransient<IResourceRepository, ResourceRepository>();
            services.AddTransient<IQuestionRepository, QuestionRepository>();
            services.AddTransient<IAnswerRepository, AnswerRepository>();


            services.AddTransient<IImageHandler, ImageHandler>();
            services.AddTransient<IImageWriter, ImageWriter>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            //app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().AllowCredentials());
            app.UseCors(builder =>
            builder.WithOrigins("http://localhost:3000", "http://192.168.1.77:3000").AllowAnyHeader().AllowAnyMethod()
            );
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseMiddleware(typeof(ErrorHandlingMiddleware));

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action}/{id:int}",
                    defaults: new { contoller = "home", action = "index" }
                    );
            });
        }
    }
}
