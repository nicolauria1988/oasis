module LocationsHelper
  def create_calendar(location = nil)
    calendar = []
    now = Date.today
    current_day = Date.new(now.year, now.month, 1)
    end_of_month = Date.new(now.year, now.month, -1)

    12.times do
      month = {}

      while current_day <= end_of_month
        day_string = current_day.strftime("%m-%d-%Y").to_sym

        if location && location.available_dates.length > 0
          location.available_dates.each do |date_range|
            start_date = Date.strptime(date_range["startDate"], "%m-%d-%Y")
            end_date = Date.strptime(date_range["endDate"], "%m-%d-%Y")

            if current_day.between?(start_date, end_date)
              month[day_string] = true
            else
              month[day_string] = false
            end
          end
        else
          month[day_string] = false
        end

        if location and location.reservations.length > 0
          location.reservations.each do |reservation|
            start_date = Date.strptime(reservation["start_date"], "%m-%d-%Y")
            end_date = Date.strptime(reservation["end_date"], "%m-%d-%Y")

            if current_day.between?(start_date, end_date)
              month[day_string] = false
            end
          end
        end
        
        current_day += 1
      end
      
      calendar << month
      end_of_month = Date.new(current_day.year, current_day.month, -1)
    end

    return calendar
  end
end