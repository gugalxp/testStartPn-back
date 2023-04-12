module.exports = {
   dialect: 'postgres', 
   host: 'dpg-cgr3lk64dadccqr5s43g-a',
   username: 'startpn_deploy_pg_user',
   password: "P9eZEvu6Upuz5ReH7jbHZ48Q2VsIg2pb",
   database: 'startpn_deploy_pg',
   port: 5432,

   define: {
      timestamps: true,
   },
   
   pool: {
      max: 5,
      min: 0,
      idle: 10000
   }
}