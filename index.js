//buttercms-mailchimp-webhooks-integration-pipedream

const axios = require("axios")
const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
  apiKey: '<YOUR-MAILCHIMP-API-KEY>',
  server: '<YOUR-MAILCHIMP-SERVER-PREFIX>',
});

const response = await axios.get('https://api.buttercms.com/v2/posts/'
+ event.body.data.id+'/?auth_token=<YOUR-BUTTERCMS-API-KEY>');

const postData = response.data;

const replicateCampaign = await client.campaigns.replicate('<YOUR-CAMPAIGN-ID>');

const updateCampaign =  await client.campaigns.update(replicateCampaign.id,{
      settings: {
      subject_line: 'New Blog Published -'+ postData.data.title,
      title:'New Blog Published'+ postData.data.title
      }
})

const sendCampaign = await client.campaigns.send(replicateCampaign.id);

return sendCampaign;
