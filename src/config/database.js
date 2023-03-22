module.exports = {
   dialect: 'postgres', 
   host: 'localhost',
   username: 'postgres',
   password: 12345,
   database: 'startpn',
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