"use strict";
/* jshint esnext:true, -W110 */

var Sequelize, sequelize, DataTypes, Promise = require('bluebird'), _ = require('lodash'), moment = require('moment');

Sequelize = DataTypes = require('./index.js');
var db = sequelize = new Sequelize('sequelize', 'root', '', {
//var db = sequelize = new Sequelize('sequelize', 'postgres', 'postgres', {
//  dialect: 'postgres',
//var db = sequelize = new Sequelize('sequelize-test-72', 'sequelize', 'nEGkLma26gXVHFUAHJxcmsrK', {
//  dialect: 'mssql',
//  host: 'mssql.sequelizejs.com',
//  port: 11433,
//  dialect: 'sqlite',
  define: {
    timestamps: false,
  },
  logging: console.log
});

var Agent = sequelize.define("agent", {
  agentid: {type: DataTypes.INTEGER , primaryKey: true},
  agent_status: DataTypes.INTEGER,
  flag: DataTypes.STRING,
  company_name: DataTypes.STRING,
  company_address: DataTypes.STRING,
  agent_country: DataTypes.INTEGER,
  description: DataTypes.STRING,
  short_description: DataTypes.STRING,
  company_phone: DataTypes.STRING,
  company_cell: DataTypes.STRING,
  company_fax: DataTypes.STRING,
  company_email: DataTypes.BOOLEAN,
  company_website: DataTypes.STRING,
  counter: DataTypes.INTEGER,
  mailcounter: DataTypes.INTEGER,
  webcounter: DataTypes.INTEGER,
  contactcounter: DataTypes.INTEGER,
  comment: DataTypes.STRING,
  read_comments: DataTypes.BOOLEAN,
  creator_id: DataTypes.INTEGER,
  auto_approve_listing: DataTypes.BOOLEAN,
  auto_email_listing: DataTypes.BOOLEAN,
  bypass_cc_email: DataTypes.STRING,
  bypass_email_userid: DataTypes.BOOLEAN,
  hide_deleted_contact: DataTypes.BOOLEAN,
  date_upgrade: DataTypes.DATE,
  listing_logo: DataTypes.BOOLEAN,
  listing_hot_text: DataTypes.INTEGER,
  agent_home_spot: DataTypes.BOOLEAN,
  agent_profile_hot_text: DataTypes.BOOLEAN,
  agent_profile_num_listings: DataTypes.INTEGER,
  paying_agent: DataTypes.BOOLEAN,
  agent_logo: DataTypes.STRING,
  new_agent_logo: DataTypes.STRING,
  agent_logo_bg_color: DataTypes.STRING,
  moved_id: DataTypes.INTEGER,
  gov_reg_authority_1: DataTypes.STRING,
  gov_reg_number_1: DataTypes.STRING,
  gov_reg_authority_2: DataTypes.STRING,
  gov_reg_number_2: DataTypes.STRING,
  agent_company_reg_name: DataTypes.STRING
},
{
  timestamps: false,
    freezeTableName: true
},
{
  instanceMethods: {
    toJSON: function(){

      console.log('called!')
      var privateAttributes = [
        'agent_status' , 'flag' , 'counter' , 'mailcounter' , 'webcounter' , 'contactcounter' , 'read_comments' ,
        'creator_id', 'auto_approve_listing' , 'auto_email_listing' , 'bypass_cc_email' , 'bypass_email_userid' ,
        'hide_deleted_contact'
      ];
      return _.omit(this.dataValues, privateAttributes);
    }
  }
});



return sequelize.sync({
  force: true,
  logging: console.log
})
  .then(() => Agent.create({
      agentid: 42
  }))
  .then(() => {

    return Agent.findAll({
      })

      .then(function(agent_list){
        console.log(JSON.stringify(agent_list[0]));
      });
  })
  .finally(() => sequelize.close());
