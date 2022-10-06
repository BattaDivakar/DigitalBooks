using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MassTransit;

namespace Reader.Notifications
{
    public class NotificationBlockedBook : IConsumer
    {
        public Task Consume(ConsumeContext context)
        {
            var data = context.MessageId;
            return Task.FromResult(true);
        }
    }
}
