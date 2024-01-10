import { useState, useEffect } from 'react';
import { useAuth } from "@logora/debate.auth.use_auth";
import { useDataProvider } from '@logora/debate.data.data_provider';
import { useAuthRequired } from '@logora/debate.hooks.use_auth_required';

export const useFollow = (resourceName, followableId) => {
    const api = useDataProvider();
    const { isLoggedIn } = useAuth();
	const requireAuthentication = useAuthRequired();
    const [followActive, setFollowActive] = useState(false);

    useEffect(() => {
        if(isLoggedIn) {
            getFollow();
        }
    }, [])

    const getFollow = () => {
        api.getOneWithToken("follows/" + resourceName, followableId).then(response => {
            if (response.data.success) {
                if (response.data.data.resource) {
                    setFollowActive(true);
                } else {
                    setFollowActive(false);
                }
            }
        }).catch(error => {
            setFollowActive(false);
        });
    }

    const followAction = () => {
        if (followActive) {
            api.delete("follows/" + resourceName, followableId).then(response => {
                setFollowActive(false)
            }, response => {
                setFollowActive(false);
            })
        } else {
            api.create("follows/" + resourceName + "/" + followableId, {}).then(response => {
                setFollowActive(true);
            }, response => {
                setFollowActive(true);
            })
        }
    }

    const handleFollow = () => {
        if (isLoggedIn) {
            followAction();
        } else {
            requireAuthentication({});
        }
    }

    return {
        followActive,
        handleFollow
    };
}
