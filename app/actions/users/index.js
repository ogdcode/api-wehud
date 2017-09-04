'use strict'

let actions = app => {
    let paths = {
        create: require('./create')(app),
        read: require('./read')(app),
        update: require('./update')(app),
        delete: require('./delete')(app),
        
        list: require('./list')(app),
        
        posts: require('./posts')(app),
        games: require('./games')(app),
        plannings: require('./plannings')(app),
        pages: require('./pages')(app),
        events: require('./events')(app),
        
        followed: require('./followed')(app),
        followedPosts: require('./followedPosts')(app),
        followedPlannings: require('./followedPlannings')(app),
        followedEvents: require('./followedEvents')(app),
        followersPosts: require('./followersPosts')(app),
        followersPlannings: require('./followersPlannings')(app),
        followersEvents: require('./followersEvents')(app),
        
        readByToken: require('./readByToken')(app),
        updateByToken: require('./updateByToken')(app),
        deleteByToken: require('./deleteByToken')(app),
        
        postsByToken: require('./postsByToken')(app),
        gamesByToken: require('./gamesByToken')(app),
        planningsByToken: require('./planningsByToken')(app),
        pagesByToken: require('./pagesByToken')(app),
        eventsByToken: require('./eventsByToken')(app),
        
        followedByToken: require('./followedByToken')(app),
        followedPostsByToken: require('./followedPostsByToken')(app),
        followedPlanningsByToken: require('./followedPlanningsByToken')(app),
        followedEventsByToken: require('./followedEventsByToken')(app),
        followersPostsByToken: require('./followersPostsByToken')(app),
        followersPlanningsByToken: require('./followersPlanningsByToken')(app),
        followersEventsByToken: require('./followersEventsByToken')(app),
        
        follow: require('./follow')(app),
        followGame: require('./followGame')(app),
        unfollow: require('./unfollow')(app),
        unfollowGame: require('./unfollowGame')(app),
    };
    
    return paths
};

module.exports = actions