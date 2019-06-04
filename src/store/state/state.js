
export default {
    drawer: false,
    dialogList: [
        {
            historyId: null,
            class: null,
            ownerId: null,
            id: null,
            name: '',
            img: '',
            lastMessage: {
                ownerId: null,
                image: '',
                name: '',
                message: '',
                unread: false
            },
            members: []
        }
    ],

    myInfo: {
        id: null,
        name: '',
        mail: '',
        password: '',
        lastVisit: '',
        avatar: '',
        friends: [],
        dialogs: []
    },

    currentChat: {
        historyId: null,
        class: null,
        ownerId: null,
        id: null,
        name: '',
        img: '',
        lastMessage: {
            ownerId: null,
            image: '',
            name: '',
            message: '',
            unread: false
        },
        members: [],
        chatStory: [
            {
                id: null,
                history: {
                    ownerId: null,
                    text: '',
                    date: null
                }

            }
        ]
    },
    messageStory: [
        // {
        //     id: null,
        //     history: {
        //         ownerId: null,
        //         text: '',
        //         date: null
        //     }
        //
        // }
    ],
    friendList: [
        {
            name: '',
            mail: '',
            id: null,
            img: '',
            lastVisit: ''
        }
    ]
}