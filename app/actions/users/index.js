'use strict'

let actions = app => {
    let paths = {
        create: require('./create')(app),
        read: require('./read')(app),
        update: require('./update')(app),
        delete: require('./delete')(app),
        
        getFollowed: require('./followed')(app),
        getFollowedPosts: require('./followedPosts')(app),
        getFollowedPlannings: require('./followedPlannings')(app),
        getFollowersPosts: require('./followersPosts')(app),
        getFollowersPlannings: require('./followersPlannings')(app),
        
        readByToken: require('./readByToken')(app),
        updateByToken: require('./updateByToken')(app),
        deleteByToken: require('./deleteByToken')(app),
        getFollowedByToken: require('./followedByToken')(app),
        getFollowedPostsByToken: require('./followedPostsByToken')(app),
        getFollowedPlanningsByToken: require('./followedPlanningsByToken')(app),
        getFollowersPostsByToken: require('./followersPostsByToken')(app),
        getFollowersPlanningsByToken: require('./followersPlanningsByToken')(app),
        
        list: require('./list')(app),
        follow: require('./follow')(app),
        followGame: require('./followGame')(app),
        unfollow: require('./unfollow')(app),
        unfollowGame: require('./unfollowGame')(app),
    };
    
    return paths
};

module.exports = actions