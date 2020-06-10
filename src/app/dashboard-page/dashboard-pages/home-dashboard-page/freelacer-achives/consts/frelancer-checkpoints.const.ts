export const freelancerCheckpointConst: {

  title: string,
  class: string,
  rank: number,
  checkpoints: any[]
}[] = [
    {
      title: 'ranks.zero.title',
      rank: 0,
      class: 'zero',
      checkpoints: [
        {
          name: 'ranks.zero.registration',
          target: '100%',
        },
        {
          name: 'ranks.zero.emal-confirmation',
          target: '100%',
        }
      ]
    },
    {
      title: 'ranks.first.title',
      class: 'start',
      rank: 1,
      checkpoints: [
        {
          name: 'ranks.first.profile-filling',
          type: 'profile',
          target: '100%',
        },
        {
          name: 'ranks.first.first-offer-creation',
          type: 'offer',
          target: '100%',
        },
        {
          name: 'ranks.first.deal-compleated',
          type: 'dealDone',
          target: '100%',
        },
      ]
    },
    {
      title: 'ranks.second.title',
      class: 'middle',
      rank: 2,
      checkpoints: [
        {
          name: 'ranks.rating',
          target: '4',
          type: 'rating'
        },
        {
          name: 'ranks.success-deals',
          target: '60%',
          type: 'deals'
        },
        {
          name: 'ranks.work-days',
          type: 'days',
          target: 50
        },

      ]
    },
    {
      title: 'ranks.third.title',
      class: 'pro',
      rank: 3,
      checkpoints: [
        {
          name: 'ranks.rating',
          target: '4,5',
          type: 'rating'
        },
        {
          name: 'ranks.success-deals',
          target: '75%',
          type: 'deals'
        },
        {
          name: 'ranks.work-days',
          type: 'days',
          target: 200
        },

      ]
    },
    {
      title: 'ranks.forth.title',
      class: 'master',
      rank: 4,
      checkpoints: [
        {
          name: 'ranks.rating',
          target: '4,8',
          type: 'rating'
        },
        {
          name: 'ranks.success-deals',
          target: '90%',
          type: 'deals'
        },
        {
          name: 'ranks.work-days',
          type: 'days',
          target: 320
        },

      ]
    },

  ];
