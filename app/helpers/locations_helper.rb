module LocationsHelper
  def create_calendar(availability = {})
    calendar = []
    now = Date.today
    current_day = Date.new(now.year, now.month, 1)
    end_of_month = Date.new(now.year, now.month, -1)

    12.times do
      month = {}

      while current_day <= end_of_month
        start_sym = current_day.strftime("%m-%d-%Y").to_sym

        if availability.length > 0
          availability.each do |date_range|
            start_date = Date.strptime(date_range["startDate"], "%m-%d-%Y")
            end_date = Date.strptime(date_range["endDate"], "%m-%d-%Y")

            if current_day.between?(start_date, end_date)
              month[start_sym] = true
            else
              month[start_sym] = false
            end
          end
        else
          month[start_sym] = false
        end
        
        current_day += 1
      end
      
      calendar << month
      end_of_month = Date.new(current_day.year, current_day.month, -1)
    end

    return calendar
  end
end